<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\CotizacionRecibida;
use App\Mail\ContactoRecibido;
use App\Models\Cotizacion;
use App\Models\MensajeContacto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class ContactoController extends Controller
{
    public function contacto(Request $request)
    {
        $data = $request->validate([
            'nombre' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:180'],
            'asunto' => ['nullable', 'string', 'max:200'],
            'mensaje' => ['required', 'string', 'max:5000'],
        ]);

        $data['ip'] = $request->ip();

        $mensaje = MensajeContacto::create($data);

        Mail::to(config('mail.from.address'))
            ->send(new ContactoRecibido($mensaje));

        return response()->json([
            'message' => 'Mensaje enviado correctamente.',
            'data' => $mensaje,
        ], 201);
    }

    public function cotizacion(Request $request)
    {
        $data = $request->validate([
            'nombre' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:180'],
            'telefono' => ['nullable', 'string', 'max:60'],
            'empresa' => ['nullable', 'string', 'max:180'],
            'tipo_sitio' => ['nullable', 'string', 'max:120'],
            'presupuesto' => ['nullable', 'string', 'max:60'],
            'plazo' => ['nullable', 'date'],
            'funcionalidades' => ['nullable', 'array'],
            'funcionalidades.*' => ['string', 'max:200'],
            'mensaje' => ['nullable', 'string', 'max:5000'],
        ]);

        $cotizacion = Cotizacion::create($data);

        Mail::to(config('mail.from.address'))
            ->send(new CotizacionRecibida($cotizacion));

        return response()->json([
            'message' => 'Cotización enviada correctamente. Te contactaremos pronto.',
            'data' => $cotizacion,
        ], 201);
    }
}