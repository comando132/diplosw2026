<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Tecnologia extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre', 'slug', 'categoria', 'icono', 'color', 'descripcion', 'orden',
    ];

    protected static function booted(): void
    {
        static::saving(function (Tecnologia $t) {
            if (empty($t->slug)) {
                $t->slug = Str::slug($t->nombre);
            }
        });
    }
}