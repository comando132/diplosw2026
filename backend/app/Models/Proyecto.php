<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Proyecto extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo', 'slug', 'cliente_nombre', 'cliente_id', 'url', 'imagen',
        'categoria', 'fecha', 'descripcion_corta', 'descripcion',
        'destacado', 'orden',
    ];

    protected $casts = [
        'fecha' => 'date',
        'destacado' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saving(function (Proyecto $p) {
            if (empty($p->slug)) {
                $p->slug = Str::slug($p->titulo);
            }
        });
    }

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }

    public function tecnologias(): BelongsToMany
    {
        return $this->belongsToMany(Tecnologia::class);
    }
}