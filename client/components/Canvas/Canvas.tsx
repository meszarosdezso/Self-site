import React from "react"
import "./Canvas.scss"
import { useTheme } from "../../providers/theme.provider"
import { HEX2RGB } from "../../utils/colors"
import dynamic from "next/dynamic"
import { isBrowser } from "../../utils/window"

const sketch = (
  p: any,
  background: string,
  accentColor: string,
  filled: boolean
) => {
  const particles: Particle[] = []

  p.setup = function () {
    if (window) p.createCanvas(window.innerWidth, window.innerHeight)
  }

  p.mousePressed = function () {
    particles.push(new Particle(p.mouseX, p.mouseY))
    if (particles.length > 32) {
      particles.splice(0, 1)
    }
  }

  p.draw = function () {
    if (!filled) {
      p.background(...HEX2RGB(background))
    } else {
      p.background(...HEX2RGB(background), 0)
    }

    particles.forEach((particle, idx) => {
      particle.update()
      particle.edges()
      particle.checkParticles(particles.slice(idx + 1))
      particle.draw()
    })
  }

  class Particle {
    pos: any
    vel: any
    size: any

    constructor(x?: any, y?: any) {
      this.pos = p.createVector(x || p.random(p.width), y || p.random(p.height))
      this.vel = p.createVector(p.random(-2, 2), p.random(-2, 2))
      this.size = filled ? 1 : 3
    }

    update() {
      this.pos.add(this.vel)
    }

    draw() {
      p.noStroke()
      p.fill(...HEX2RGB(accentColor), filled ? 30 : 255)
      p.circle(this.pos.x, this.pos.y, this.size * 2)
    }

    edges() {
      if (this.pos.x < 0 || this.pos.x > p.width) {
        this.vel.x *= -1
      }

      if (this.pos.y < 0 || this.pos.y > p.height) {
        this.vel.y *= -1
      }
    }

    checkParticles(particlesToCheck: Particle[]) {
      particlesToCheck.forEach((other) => {
        const d = this.pos.dist(other.pos)
        if (d < 200) {
          p.stroke(...HEX2RGB(accentColor), filled ? 30 : 255)
          p.line(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
        }
      })
    }
  }
}

const Canvas: React.FC = () => {
  if (!isBrowser()) return <div></div>

  const P5Wrapper: any = dynamic(import("react-p5-wrapper"), {
    ssr: false,
  })

  const { backgroundColor, accentColor } = useTheme()
  const filled = Math.random() < 0.5

  return (
    <P5Wrapper
      sketch={(p: any) => sketch(p, backgroundColor, accentColor, filled)}
    />
  )
}

export default Canvas
