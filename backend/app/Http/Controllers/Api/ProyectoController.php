<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Proyecto;
use Illuminate\Http\Request;

class ProyectoController extends Controller
{
    public function index(Request $request)
    {
        $query = Proyecto::with('tecnologias', 'cliente')
            ->orderBy('orden')
            ->orderByDesc('created_at');

        if ($request->boolean('destacados')) {
            $query->where('destacado', true);
        }

        if ($request->filled('categoria')) {
            $query->where('categoria', $request->string('categoria'));
        }

        return $query->paginate($request->integer('per_page', 12));
    }

    public function show(string $slug)
    {
        $proyecto = Proyecto::with('tecnologias', 'cliente')
            ->where('slug', $slug)
            ->firstOrFail();

        return $proyecto;
    }
}