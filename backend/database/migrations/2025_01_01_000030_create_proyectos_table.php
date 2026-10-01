<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proyectos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('slug')->unique();
            $table->string('cliente_nombre')->nullable();
            $table->foreignId('cliente_id')->nullable()->constrained('clientes')->nullOnDelete();
            $table->string('url')->nullable();
            $table->string('imagen')->nullable();
            $table->string('categoria')->nullable();
            $table->date('fecha')->nullable();
            $table->text('descripcion_corta')->nullable();
            $table->longText('descripcion')->nullable();
            $table->boolean('destacado')->default(false);
            $table->integer('orden')->default(0);
            $table->timestamps();
        });

        Schema::create('proyecto_tecnologia', function (Blueprint $table) {
            $table->foreignId('proyecto_id')->constrained('proyectos')->cascadeOnDelete();
            $table->foreignId('tecnologia_id')->constrained('tecnologias')->cascadeOnDelete();
            $table->primary(['proyecto_id', 'tecnologia_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proyecto_tecnologia');
        Schema::dropIfExists('proyectos');
    }
};