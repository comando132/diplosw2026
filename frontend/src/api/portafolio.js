import api from './client'

export const fetchProyectos = (params = {}) => api.get('/proyectos', { params })
export const fetchProyecto = (slug) => api.get(`/proyectos/${slug}`)
export const fetchClientes = (params = {}) => api.get('/clientes', { params })
export const fetchTecnologias = (params = {}) => api.get('/tecnologias', { params })
export const enviarContacto = (data) => api.post('/contacto', data)
export const enviarCotizacion = (data) => api.post('/cotizaciones', data)