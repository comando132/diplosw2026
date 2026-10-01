@component('mail::message')
# Nueva solicitud de cotización

Has recibido una nueva solicitud de cotización de sitio web.

@component('mail::panel')
- **Nombre:** {{ $cotizacion->nombre }}
- **Email:** {{ $cotizacion->email }}
- **Teléfono:** {{ $cotizacion->telefono ?? '—' }}
- **Empresa:** {{ $cotizacion->empresa ?? '—' }}
- **Tipo de sitio:** {{ $cotizacion->tipo_sitio ?? '—' }}
- **Presupuesto:** {{ $cotizacion->presupuesto ?? '—' }}
- **Plazo deseado:** {{ $cotizacion->plazo?->format('d/m/Y') ?? '—' }}
@endcomponent

**Funcionalidades solicitadas:**
@if (!empty($cotizacion->funcionalidades))
- @foreach ($cotizacion->funcionalidades as $f){{ $f }}@unless ($loop->last)@endif
@endforeach
@else
- No especificadas
@endif

**Mensaje:**

{{ $cotizacion->mensaje ?? '—' }}

@endcomponent