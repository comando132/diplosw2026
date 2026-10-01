<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\Tecnologia;
use Illuminate\Http\Request;

class PortafolioController extends Controller
{
    public function clientes(Request $request)
    {
        $query = Cliente::orderBy('orden')->orderByDesc('created_at');

        if ($request->boolean('destacados')) {
            $query->where('destacado', true);
        }

        return $query->get();
    }

    public function tecnologias(Request $request)
    {
        $query = Tecnologia::orderBy('orden')->orderBy('nombre');

        if ($request->filled('categoria')) {
            $query->where('categoria', $request->string('categoria'));
        }

        return $query->get();
    }
}