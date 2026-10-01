@component('mail::message')
# Nuevo mensaje de contacto

Has recibido un nuevo mensaje desde el formulario de contacto del portafolio.

@component('mail::panel')
- **Nombre:** {{ $mensaje->nombre }}
- **Email:** {{ $mensaje->email }}
- **Asunto:** {{ $mensaje->asunto ?? '—' }}
- **IP:** {{ $mensaje->ip ?? '—' }}
@endcomponent

**Mensaje:**

{{ $mensaje->mensaje }}

@endcomponent