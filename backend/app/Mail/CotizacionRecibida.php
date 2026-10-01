<?php

namespace App\Mail;

use App\Models\Cotizacion;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CotizacionRecibida extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Cotizacion $cotizacion) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nueva solicitud de cotización: ' . ($this->cotizacion->tipo_sitio ?? 'Sitio web'),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.cotizacion',
            with: ['cotizacion' => $this->cotizacion],
        );
    }
}