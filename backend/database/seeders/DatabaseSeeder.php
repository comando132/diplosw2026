<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\Cotizacion;
use App\Models\MensajeContacto;
use App\Models\Proyecto;
use App\Models\Tecnologia;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $tecnologias = collect([
            ['nombre' => 'Laravel', 'categoria' => 'Backend', 'color' => '#FF2D20', 'icono' => 'laravel'],
            ['nombre' => 'React', 'categoria' => 'Frontend', 'color' => '#61DAFB', 'icono' => 'react'],
            ['nombre' => 'Vue.js', 'categoria' => 'Frontend', 'color' => '#42B883', 'icono' => 'vue'],
            ['nombre' => 'Tailwind CSS', 'categoria' => 'Frontend', 'color' => '#06B6D4', 'icono' => 'tailwind'],
            ['nombre' => 'MariaDB', 'categoria' => 'Base de datos', 'color' => '#003545', 'icono' => 'mariadb'],
            ['nombre' => 'Docker', 'categoria' => 'DevOps', 'color' => '#2496ED', 'icono' => 'docker'],
            ['nombre' => 'TypeScript', 'categoria' => 'Lenguaje', 'color' => '#3178C6', 'icono' => 'typescript'],
            ['nombre' => 'Node.js', 'categoria' => 'Backend', 'color' => '#339933', 'icono' => 'node'],
        ])->map(fn ($t) => Tecnologia::create(array_merge($t, ['orden' => 0, 'slug' => \Illuminate\Support\Str::slug($t['nombre'])])));

        $clientes = collect([
            ['nombre' => 'Restaurante La Cocina', 'empresa' => 'La Cocina S.A.', 'sector' => 'Gastronomía', 'sitio_web' => 'https://lacocina.example', 'testimonio' => 'Excelente trabajo, el sitio nos ayudó a triplicar reservas.', 'destacado' => true, 'orden' => 1],
            ['nombre' => 'TechStore', 'empresa' => 'TechStore Inc.', 'sector' => 'E-commerce', 'sitio_web' => 'https://techstore.example', 'testimonio' => 'Tienda rápida y moderna, ventas aumentaron 40%.', 'destacado' => true, 'orden' => 2],
            ['nombre' => 'Clínica Vital', 'empresa' => 'Vital Salud', 'sector' => 'Salud', 'sitio_web' => 'https://vital.example', 'testimonio' => 'Sistema de citas claro y profesional.', 'destacado' => false, 'orden' => 3],
            ['nombre' => 'Constructora Andes', 'empresa' => 'Andes Ltd.', 'sector' => 'Construcción', 'sitio_web' => 'https://andes.example', 'testimonio' => 'Catálogo de obras impactante.', 'destacado' => false, 'orden' => 4],
        ])->map(fn ($c) => Cliente::create($c));

        $proyectos = [
            [
                'titulo' => 'Plataforma de reservas gastronómicas',
                'cliente_id' => $clientes[0]->id,
                'categoria' => 'Web App',
                'fecha' => '2024-09-15',
                'url' => 'https://lacocina.example',
                'descripcion_corta' => 'Sistema de reservas en línea con panel de administración.',
                'destacado' => true,
                'orden' => 1,
                'tecnologias' => ['Laravel', 'React', 'MariaDB', 'Tailwind CSS'],
            ],
            [
                'titulo' => 'E-commerce de electrónica',
                'cliente_id' => $clientes[1]->id,
                'categoria' => 'E-commerce',
                'fecha' => '2024-06-01',
                'url' => 'https://techstore.example',
                'descripcion_corta' => 'Tienda online con pasarela de pago y gestión de inventario.',
                'destacado' => true,
                'orden' => 2,
                'tecnologias' => ['Laravel', 'Vue.js', 'MariaDB', 'Docker'],
            ],
            [
                'titulo' => 'Portal de citas médicas',
                'cliente_id' => $clientes[2]->id,
                'categoria' => 'Web App',
                'fecha' => '2025-01-20',
                'url' => 'https://vital.example',
                'descripcion_corta' => 'Agenda de citas con notificaciones por correo.',
                'destacado' => false,
                'orden' => 3,
                'tecnologias' => ['Laravel', 'React', 'TypeScript', 'MariaDB'],
            ],
            [
                'titulo' => 'Catálogo de obras de construcción',
                'cliente_id' => $clientes[3]->id,
                'categoria' => 'Sitio Web',
                'fecha' => '2024-03-10',
                'url' => 'https://andes.example',
                'descripcion_corta' => 'Sitio institucional con galería de proyectos.',
                'destacado' => false,
                'orden' => 4,
                'tecnologias' => ['React', 'Tailwind CSS', 'Node.js'],
            ],
        ];

        foreach ($proyectos as $data) {
            $techs = $data['tecnologias'];
            unset($data['tecnologias']);
            $data['slug'] = \Illuminate\Support\Str::slug($data['titulo']);
            $proyecto = Proyecto::create($data);
            $ids = $tecnologias->filter(fn ($t) => in_array($t->nombre, $techs))->pluck('id');
            $proyecto->tecnologias()->attach($ids);
        }

        Cotizacion::create([
            'nombre' => 'María González',
            'email' => 'maria@example.com',
            'telefono' => '+34 600 123 456',
            'empresa' => 'Boutique Aurora',
            'tipo_sitio' => 'E-commerce',
            'presupuesto' => '3000-5000',
            'plazo' => '2025-12-01',
            'funcionalidades' => ['Catálogo', 'Pasarela de pago', 'Blog'],
            'mensaje' => 'Necesito una tienda online para mi boutique de ropa.',
            'estado' => 'nueva',
        ]);

        MensajeContacto::create([
            'nombre' => 'Carlos Ramírez',
            'email' => 'carlos@example.com',
            'asunto' => 'Consulta sobre mantenimiento',
            'mensaje' => '¿Ofrecen planes de mantenimiento mensual para sitios web?',
            'estado' => 'nuevo',
        ]);
    }
}