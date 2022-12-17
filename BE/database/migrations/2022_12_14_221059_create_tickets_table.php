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
        Schema::create('tickets', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('match_id');
            $table->unsignedBigInteger('reservation_date');
            $table->string('seat'); //norm or vip
            $table->unsignedInteger('seat_row')->nullable();
            $table->unsignedInteger('seat_number')->nullable();
            $table->uuid('ticket_number');
            $table->primary(['user_id', 'match_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('match_id')->references('id')->on('match_tables')->onDelete('cascade');
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
        Schema::dropIfExists('tickets');
    }
};
