<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('match_tables', function (Blueprint $table) {
            $table->id();
            $table->integer('team_1');
            $table->integer('team_2');
            $table->unsignedBigInteger('match_date');
            $table->string('main_ref');
            $table->string('lineman_1');
            $table->string('lineman_2');
            $table->unsignedBigInteger('stadium_id');
            $table->foreign('stadium_id')->references('id')->on('stadia')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('match_tables');
    }
};
