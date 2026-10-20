import { useState, useEffect } from 'react'
import axios from 'axios'
import SolicitudCard from './components/SolicitudCard.jsx'

const API_URL = 'http://localhost:8081/api/solicitudes'

function App() {
  const [solicitudes, setSolicitudes] = useState([])
  const [titulo, setTitulo] = useState('')
  const [prioridad, setPrioridad] = useState('Media')
  const [filtro, setFiltro] = useState('Todas')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(true)

  // Cargar solicitudes desde el Backend al montar el componente
  useEffect(() => {
    obtenerSolicitudes()
  }, [])

  const obtenerSolicitudes = async () => {
    try {
      const respuesta = await axios.get(API_URL)
      setSolicitudes(respuesta.data)
      setCargando(false)
    } catch (error) {
      console.error('Error al obtener solicitudes:', error)
      setMensaje('Error al conectar con el servidor backend.')
      setCargando(false)
    }
  }

  const agregar = async (e) => {
    e.preventDefault()
    if (!titulo.trim()) {
      setMensaje('Escribe una descripción de la solicitud.')
      return
    }

    try {
      const nuevaSolicitud = {
        titulo: titulo.trim(),
        prioridad,
        estado: 'Pendiente'
      }
      const respuesta = await axios.post(API_URL, nuevaSolicitud)
      setSolicitudes(actuales => [...actuales, respuesta.data])
      setTitulo('')
      setMensaje('Solicitud registrada con éxito en la API.')
    } catch (error) {
      console.error('Error al guardar la solicitud:', error)
      setMensaje('Error al guardar en el servidor.')
    }
  }

  const resolverSolicitud = async (id) => {
    try {
      const respuesta = await axios.patch(`${API_URL}/${id}`, { estado: 'Resuelta' })
      setSolicitudes(actuales =>
          actuales.map(s => s.id === id ? respuesta.data : s)
      )
    } catch (error) {
      console.error('Error al actualizar estado:', error)
    }
  }

  const pendientesCount = solicitudes.filter(s => s.estado === 'Pendiente').length

  const visibles = solicitudes.filter(s =>
      filtro === 'Todas' || s.estado === filtro
  )

  return (
      <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Sistema de Soporte Técnico (Conectado a API)</h1>
        <p>Total registradas: {solicitudes.length}</p>
        <p><strong>Solicitudes pendientes:</strong> {pendientesCount}</p>

        <form onSubmit={agregar}>
          <div>
            <label htmlFor="titulo">Descripción: </label>
            <input
                id="titulo"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label htmlFor="prioridad">Prioridad: </label>
            <select
                id="prioridad"
                value={prioridad}
                onChange={e => setPrioridad(e.target.value)}
            >
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>
          <button type="submit" style={{ marginTop: '10px' }}>Registrar</button>
        </form>

        <p role="status" style={{ color: 'blue' }}>{mensaje}</p>

        <div style={{ marginTop: '20px' }}>
          <label htmlFor="filtro">Filtrar por estado: </label>
          <select
              id="filtro"
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
          >
            <option>Todas</option>
            <option>Pendiente</option>
            <option>En proceso</option>
            <option>Resuelta</option>
          </select>
        </div>

        <section style={{ marginTop: '20px' }}>
          {cargando ? (
              <p>Cargando datos desde el servidor...</p>
          ) : visibles.length === 0 ? (
              <p>No hay resultados.</p>
          ) : (
              visibles.map(s => (
                  <SolicitudCard
                      key={s.id}
                      {...s}
                      onResolver={() => resolverSolicitud(s.id)}
                  />
              ))
          )}
        </section>
      </main>
  )
}

export default App