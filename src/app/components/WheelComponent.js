import React, { useEffect, useState, useRef } from 'react'
import _ from 'lodash';

const randomString = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
  const length = 8;
  let str = '';
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)]
  }
  return str;
}

const WheelComponent = (props) => {
  const { 
    segments, segColors, onFinished, primaryColor = 'black', contrastColor = 'white', buttonText = 'Spin', isOnlyOnce = true,
    // eslint-disable-next-line no-unused-vars
    size = window.innerWidth, upDuration = 100, downDuration = 1000, fontFamily = 'Arial', fontSize = '1em', outlineWidth = 10
  } = props;
  const stateRef = useRef();
  stateRef.current = props;


  const winningSegmentRef = useRef();
  const canvasContextRef = useRef();
  const canvasId = useRef(`canvas-${randomString()}`);
  const wheelId = useRef(`wheel-${randomString()}`);
  const dimension = (size + 20) * 2;

  // const centerX = sizeRef.current + 20;
  // const centerY = sizeRef.current + 20;
  
  const centerRef = useRef();
  centerRef.current = size + 20

  const sizeRef = useRef();
  sizeRef.current = size;
  const dimensionRef = useRef();
  dimensionRef.current = dimension;
  
  
  
  let currentSegment = '';
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  let timerHandle = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  // let canvasContext = null;
  let maxSpeed = Math.PI / segments.length;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  let spinStart = 0;
  let frames = 0;
  

  const wheelInit = () => {
    initCanvas()
    wheelDraw()
  }

  const initCanvas = () => {
    let canvas = document.getElementById(canvasId.current);

    if (navigator.userAgent.indexOf('MSIE') !== -1) {
      canvas = document.createElement('canvas')
      canvas.setAttribute('width', `${dimensionRef.current}`)
      canvas.setAttribute('height', `${dimensionRef.current}`)
      canvas.setAttribute('id', canvasId.current)
      document.getElementById(wheelId.current)?.appendChild(canvas)
    }
    canvas?.addEventListener('click', spin);
    canvasContextRef.current = canvas?.getContext('2d')
  }

  const spin = () => {
    winningSegmentRef.current = segments[_.random(segments.length - 1)];

    isStarted = true
    if (timerHandle === 0) {
      spinStart = new Date().getTime()
      maxSpeed = Math.PI / (segments.length + (segments.length * Math.random()));
      frames = 0;
      timerHandle = window.setInterval(onTimerTick, timerDelay)
    }
  }

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {;
      progress = duration / upTime
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegmentRef.current) {
        if (currentSegment === winningSegmentRef.current && frames > segments.length) {
          progress = duration / upTime;
          angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true
    }

    angleCurrent += angleDelta
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2
    if (finished) {
      setFinished(true)
      onFinished(currentSegment)
      clearInterval(timerHandle)
      timerHandle = 0
      angleDelta = 0
    }
  }

  const wheelDraw = () => {
    clear()
    drawWheel()
    drawNeedle()
  }

  const draw = () => {
    clear()
    drawWheel()
    drawNeedle()
  }

  const drawSegment = (key, lastAngle, angle) => {
    // if (!canvasContext) {
    if (!canvasContextRef.current) {
      return false
    }
    // const ctx = canvasContext
    const ctx = canvasContextRef.current
    const value = segments[key]
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(centerRef.current, centerRef.current)
    ctx.arc(centerRef.current, centerRef.current, sizeRef.current, lastAngle, angle, false)
    ctx.lineTo(centerRef.current, centerRef.current)
    ctx.closePath()
    ctx.fillStyle = segColors[key % segColors.length]
    ctx.fill()
    ctx.stroke()
    ctx.save()
    ctx.translate(centerRef.current, centerRef.current)
    ctx.rotate((lastAngle + angle) / 2)
    ctx.fillStyle = contrastColor
    ctx.font = `bold ${stateRef.current.fontSize} ${stateRef.current.fontFamily}`
    ctx.fillText(value.substring(0, 21), sizeRef.current / 2 + 20, 0)
    ctx.restore()
  }

  const drawWheel = () => {
    if (!canvasContextRef.current) {
      return false
    }
    const ctx = canvasContextRef.current
    let lastAngle = angleCurrent
    const len = segments.length
    const PI2 = Math.PI * 2
    ctx.lineWidth = 1
    ctx.strokeStyle = primaryColor
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    // ctx.font = '1em ' + fontFamily
    ctx.font = `${stateRef.current.fontSize} ${stateRef.current.fontFamily}`

    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent
      drawSegment(i - 1, lastAngle, angle)
      lastAngle = angle
    }

    // Draw a center circle
    ctx.beginPath()
    ctx.arc(centerRef.current, centerRef.current, sizeRef.current * 0.2, 0, PI2, false)
    ctx.closePath()
    ctx.fillStyle = primaryColor
    ctx.lineWidth = 10
    ctx.strokeStyle = contrastColor
    ctx.fill()
    ctx.font = 'bold 1em ' + fontFamily
    ctx.fillStyle = contrastColor
    ctx.textAlign = 'center'
    ctx.fillText(buttonText, centerRef.current, centerRef.current + 3)
    ctx.stroke()

    // Draw outer circle
    ctx.beginPath()
    ctx.arc(centerRef.current, centerRef.current, sizeRef.current, 0, PI2, false)
    ctx.closePath()

    ctx.lineWidth = stateRef.current.outlineWidth;
    ctx.strokeStyle = primaryColor
    ctx.stroke()
  }

  const drawNeedle = () => {
    if (!canvasContextRef.current) {
      return false
    }
    const w = sizeRef.current * 0.2;
    const h = w * 0.4;

    const ctx = canvasContextRef.current
    ctx.lineWidth = 1
    ctx.strokeStyle = contrastColor
    ctx.fillStyle = contrastColor
    ctx.beginPath()
    ctx.moveTo(centerRef.current + h, centerRef.current - w)
    ctx.lineTo(centerRef.current - h, centerRef.current - w)
    ctx.lineTo(centerRef.current, centerRef.current - (w + h))
    ctx.closePath()
    ctx.fill()
    const change = angleCurrent + Math.PI / 2
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1
    if (i < 0) i = i + segments.length
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = primaryColor
    ctx.font = 'bold 1.5em ' + fontFamily
    currentSegment = segments[i]
    isStarted && ctx.fillText(currentSegment, centerRef.current + 10, centerRef.current + sizeRef.current + 50)
  }

  const clear = () => {
    if (!canvasContextRef.current) {
      return false
    }
    const ctx = canvasContextRef.current
    ctx.clearRect(0, 0, dimensionRef.current, dimensionRef.current)
  }

  useEffect(() => {
    //destroyCanvas();
    draw();
    

  }, [size]);

  useEffect(() => {
    wheelInit()
    setTimeout(() => {
      window.scrollTo(0, 1)
    }, 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return {
    spin: () => {
      spin();
    } ,
    component: (<div id={wheelId.current}><canvas id={canvasId.current} width={dimensionRef.current} height={dimensionRef.current} style={{ pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto' }} /></div>)
  }
}
export default WheelComponent