import { calcAng, calculateAngle } from "./util"

export const COLOR = {
  DarkModerateGreen: "#6d863b",
  White: "#ffffff",
  Black: "#000000",
}

/**
 * Draws an arch on the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
 * @param {Object} center - The center point of the arch.
 * @param {Object} start - The starting point of the arch.
 * @param {Object} end - The ending point of the arch.
 * @param {string} color - The color of the arch.
 * @param {number} count - The count value.
 */
export const drawArch = (ctx, center, start, end, color, count) => {
  let endAngle = calcAng(start, center, end, ctx)
  let startAngle = calculateAngle(start, center, ctx)
  if (Math.abs(endAngle) > Math.PI) {
    endAngle = 2 * Math.PI - Math.abs(endAngle)
  }

  let radius =
    Math.sqrt(
      Math.pow(ctx.canvas.width * (start.x - center.x), 2) +
        Math.pow(ctx.canvas.height * (start.y - center.y), 2),
    ) / 8
  ctx.scale(-1, 1)
  ctx.globalAlpha = 0.2
  ctx.beginPath()
  // Move to the center of the circle
  ctx.moveTo(-(center.x * ctx.canvas.width), center.y * ctx.canvas.height)

  // Draw a line to the starting point of the arc
  let pnt_x = -(center.x * ctx.canvas.width) + radius * Math.cos(startAngle)
  let pnt_y = center.y * ctx.canvas.height + radius * Math.sin(startAngle)
  ctx.lineTo(pnt_x, pnt_y)
  /*
     if (start.y < end.y  ) {
          if (start.x < end.x  ) {
              ctx.arc(-(center.x * ctx.canvas.width), center.y * (ctx.canvas.height),40, startAngle , startAngle -  endAngle , true);
              console.log("I");
          }else{
          ctx.arc(-(center.x * ctx.canvas.width), center.y * (ctx.canvas.height),40, startAngle , startAngle -  endAngle , true);
              console.log(" II");
          }
      }else{
          if (start.x < end.x  ) {
              ctx.arc(-(center.x * ctx.canvas.width), center.y * (ctx.canvas.height),40, startAngle , startAngle -  endAngle , true);
              console.log(" III");
          }else{
          ctx.arc(-(center.x * ctx.canvas.width), center.y * (ctx.canvas.height),40, startAngle , startAngle - endAngle , false);
              console.log(" IV");
          }
         }
   */
  if (start.x > center.x) {
    //  console.log("Primul")
    //console.log("Dreapta");
    if (start.y < end.y) {
      if (start.x > end.x) {
        if (
          count == 0 ||
          count == 1 ||
          count == 7 ||
          count == 9 ||
          count == 11 ||
          count == 12 ||
          count == 13
        ) {
          if (endAngle > 3.14) {
            ctx.arc(
              -(center.x * ctx.canvas.width),
              center.y * ctx.canvas.height,
              radius,
              startAngle,
              startAngle - endAngle,
              true,
            )
          } else {
            ctx.arc(
              -(center.x * ctx.canvas.width),
              center.y * ctx.canvas.height,
              radius,
              startAngle,
              startAngle + endAngle,
              true,
            )
          }
        } else {
          ctx.arc(
            -(center.x * ctx.canvas.width),
            center.y * ctx.canvas.height,
            radius,
            startAngle,
            startAngle - endAngle,
            true,
          )
        }
        //  console.log(" I");
      } else {
        ctx.arc(
          -(center.x * ctx.canvas.width),
          center.y * ctx.canvas.height,
          radius,
          startAngle,
          startAngle - endAngle,
          true,
        )
        //console.log(" II");
      }
    } else {
      if (start.x > end.x) {
        if (
          count == 0 ||
          count == 1 ||
          count == 4 ||
          count == 7 ||
          count == 10
        ) {
          ctx.arc(
            -(center.x * ctx.canvas.width),
            center.y * ctx.canvas.height,
            radius,
            startAngle,
            startAngle - endAngle,
            false,
          )
        } else {
          ctx.arc(
            -(center.x * ctx.canvas.width),
            center.y * ctx.canvas.height,
            radius,
            startAngle,
            startAngle - endAngle,
            true,
          )
        }
        //  console.log(" III");
      } else {
        // if (count == 4){
        ctx.arc(
          -(center.x * ctx.canvas.width),
          center.y * ctx.canvas.height,
          radius,
          startAngle,
          startAngle - endAngle,
          false,
        )
        //}else{ctx.arc(-(center.x * ctx.canvas.width), center.y * (ctx.canvas.height),radius, startAngle , startAngle -  endAngle , false);  }
        //console.log(" IV");
      }
    }
  } else {
    //console.log("Stanga");
    if (start.y < end.y) {
      if (start.x > end.x) {
        if (count == 8) {
          ctx.arc(
            -(center.x * ctx.canvas.width),
            center.y * ctx.canvas.height,
            radius,
            startAngle,
            startAngle - endAngle,
            false,
          )
        } else {
          ctx.arc(
            -(center.x * ctx.canvas.width),
            center.y * ctx.canvas.height,
            radius,
            startAngle,
            startAngle + endAngle,
            false,
          )
        }
        // console.log(" I");
      } else {
        if (startAngle > 0) {
          ctx.arc(
            -(center.x * ctx.canvas.width),
            center.y * ctx.canvas.height,
            radius,
            startAngle,
            startAngle - endAngle,
            false,
          )
          //      console.log(" II");
        } else {
          if (
            count == 0 ||
            count == 1 ||
            count == 6 ||
            count == 8 ||
            count == 9 ||
            count == 10 ||
            count == 12 ||
            count == 16 ||
            count == 17
          ) {
            ctx.arc(
              -(center.x * ctx.canvas.width),
              center.y * ctx.canvas.height,
              radius,
              startAngle,
              startAngle - endAngle,
              true,
            )
          } else {
            ctx.arc(
              -(center.x * ctx.canvas.width),
              center.y * ctx.canvas.height,
              radius,
              startAngle,
              startAngle + endAngle,
              false,
            )
          }
          //        console.log(" II bic");
        }
      }
    } else {
      if (start.x > end.x) {
        ctx.arc(
          -(center.x * ctx.canvas.width),
          center.y * ctx.canvas.height,
          40,
          startAngle,
          startAngle - endAngle,
          true,
        )
        //     console.log(" III");
      } else {
        if (count == 4 || count == 10) {
          ctx.arc(
            -(center.x * ctx.canvas.width),
            center.y * ctx.canvas.height,
            40,
            startAngle,
            startAngle - endAngle,
            false,
          )
        } else {
          ctx.arc(
            -(center.x * ctx.canvas.width),
            center.y * ctx.canvas.height,
            40,
            startAngle,
            startAngle - endAngle,
            true,
          )
        }
        //      console.log(" IV");
      }
    }
  }
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.strokeStyle = color
  ctx.stroke()
  ctx.scale(-1, 1)
  ctx.globalAlpha = 1.0
}

export const draw_angles = (landmarksCoords, angleValues, canvasCtx) => {}
export const draw_targets = (landmarksCoords, radius, canvasCtx) => {
  Object.keys(landmarksCoords).forEach((key) => {
    // Get coordinates and scale them
    const [targetX, targetY] = landmarksCoords[key]
    //console.log("Drawing for ", key);
    const x = targetX * canvasCtx.canvas.width
    const y = targetY * canvasCtx.canvas.height

    //draw circle at x2 and y2
    canvasCtx.beginPath()
    canvasCtx.arc(x, y, radius * 3, 0, 2 * Math.PI)
    //fill style transparent
    canvasCtx.fillStyle = "rgba(150, 150, 150, 0.2)"
    canvasCtx.fill()
    canvasCtx.strokeStyle = "green"
    canvasCtx.stroke()
  })
}

export const updateRadialProgress = (canvas, canvasCtx, score, insideText) => {
  // Salvează starea actuală a contextului (transformări, stiluri, etc.)
  canvasCtx.save()

  // Resetăm transformările pentru a desena în coordonate absolute,
  // astfel încât poziționarea să nu fie afectată de operațiile anterioare.
  canvasCtx.setTransform(1, 0, 0, 1, 0, 0)

  // Stabilim offset-ul dorit pentru colțul din stânga sus (ex. 10px de la margine)
  const offsetX = 10
  const offsetY = 10

  // Stabilim parametrii indicatorului
  const radius = 100 // 50px radius
  const centerX = canvas.width - (offsetX + radius)
  const centerY = offsetY + radius

  // Desenăm cercul de fundal (cercul complet, culoare gri deschis)
  canvasCtx.beginPath()
  canvasCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  canvasCtx.strokeStyle = "#eee"
  canvasCtx.lineWidth = 10
  canvasCtx.stroke()

  // Calculăm unghiul de început și cel de final
  // Pornim de la -90° (adică -0.5 * PI) pentru a începe de la partea de sus
  const startAngle = -0.5 * Math.PI
  const endAngle = startAngle + (score / 100) * 2 * Math.PI

  // Desenăm arcul de progres (indicatorul propriu-zis, de exemplu, culoare verde)
  canvasCtx.beginPath()
  canvasCtx.arc(centerX, centerY, radius, startAngle, endAngle)
  canvasCtx.strokeStyle = "#6d863b"
  canvasCtx.lineWidth = 10
  canvasCtx.stroke()

  // Desenăm textul cu procentajul în centru
  canvasCtx.font = "bold 50px Arial"
  canvasCtx.fillStyle = "#fff"
  canvasCtx.textAlign = "center"
  canvasCtx.textBaseline = "middle"
  canvasCtx.fillText(insideText, centerX, centerY)

  // Restaurăm starea anterioară a contextului, astfel încât alte operații să nu fie afectate
  canvasCtx.restore()
}
