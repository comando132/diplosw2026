<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cotizaciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('email');
            $table->string('telefono')->nullable();
            $table->string('empresa')->nullable();
            $table->string('tipo_sitio')->nullable();
            $table->string('presupuesto')->nullable();
            $table->date('plazo')->nullable();
            $table->json('funcionalidades')->nullable();
            $table->longText('mensaje')->nullable();
            $table->string('estado')->default('nueva');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cotizaciones');
    }
};