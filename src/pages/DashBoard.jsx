import React, { useState, useEffect, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import ThemeToggle from "../components/ThemeToggle"
import IncidentList from "../components/IncidentList"
import IncidentForm from "../components/IncidentForm"
import { mockdata } from "../assets/mockdata"
import "./DashBoard.css"

// Mock data
const initialIncidents = mockdata;

const DashBoard = () => {
  
  const { theme } = useContext(ThemeContext)
  const [incidents, setIncidents] = useState(initialIncidents)
  const [filterSeverity, setFilterSeverity] = useState("All")
  const [sortOrder, setSortOrder] = useState("newest")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const canvas = document.getElementById("circuit-bg")
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const nodes = []
    const nodeCount = 100
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        connected: [],
      })
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          nodes[i].connected.push(j)
          nodes[j].connected.push(i)
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = theme === "dark" ? "rgba(0, 255, 0, 0.15)" : "rgba(0, 100, 0, 0.15)"
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        for (let j = 0; j < node.connected.length; j++) {
          const connectedNode = nodes[node.connected[j]]
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(connectedNode.x, connectedNode.y)
          ctx.stroke()
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = theme === "dark" ? "rgba(0, 255, 0, 0.7)" : "rgba(0, 100, 0, 0.7)"
        ctx.fill()

        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
      }

      const time = Date.now() * 0.001
      for (let i = 0; i < 5; i++) {
        const index = Math.floor(Math.random() * nodes.length)
        const node = nodes[index]
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * (2 + Math.sin(time) * 2), 0, Math.PI * 2)
        ctx.fillStyle = theme === "dark" ? "rgba(0, 255, 0, 0.3)" : "rgba(0, 100, 0, 0.3)"
        ctx.fill()
      }
    }

    const interval = setInterval(draw, 30)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [theme])

  const filteredIncidents = incidents.filter(
    (incident) => filterSeverity === "All" || incident.severity === filterSeverity
  )

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at)
    const dateB = new Date(b.reported_at)
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  const addIncident = (newIncident) => {
    const now = new Date().toISOString()
    const incidentWithId = {
      ...newIncident,
      id: incidents.length + 1,
      reported_at: now,
    }
    setIncidents((prev) => [...prev, incidentWithId])
    setShowForm(false)
  }

  return (
    <div className={`dashboard ${theme}`}>
      <canvas id="circuit-bg" className="circuit-background"></canvas>
      <div className="dashboard-overlay">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <a href="/" className="header-logo">
                <div className="logo-circle"><img src="/human_chain.jpg" alt="" /> </div>
                <span>HumanChain</span>
              </a>
              <h1 className="dashboard-title">AI Safety Incident Dashboard</h1>
            </div>
            <div className="header-actions">
              <ThemeToggle />
              <a href="/" className="home-link">
                <span className="home-icon">⌂</span>
                Home
              </a>
              <button
                className={`report-button ${showForm ? "active" : ""}`}
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "✕ Cancel" : "+ Report Incident"}
              </button>
            </div>
          </div>
        </header>

        <main className="dashboard-main">
          {showForm && (
            <div className="form-container">
              <IncidentForm onSubmit={addIncident} />
            </div>
          )}

          <div className="controls-container">
            <div className="filter-controls">
              <div className="filter-label">
                <span className="filter-icon">⚙</span>
                <span>Severity:</span>
              </div>
              <div className="filter-buttons">
                {["All", "Low", "Medium", "High"].map((severity) => (
                  <button
                    key={severity}
                    className={`filter-button ${filterSeverity === severity ? "active" : ""} ${
                      severity !== "All" ? severity.toLowerCase() : ""
                    }`}
                    onClick={() => setFilterSeverity(severity)}
                  >
                    {severity}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="sort-button"
              onClick={() =>
                setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
              }
            >
              {sortOrder === "newest" ? "↓ Newest First" : "↑ Oldest First"}
            </button>
          </div>

          <IncidentList incidents={sortedIncidents} />
        </main>
      </div>
    </div>
  )
}

export default DashBoard
