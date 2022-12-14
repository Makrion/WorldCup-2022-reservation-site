<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\MatchTable;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tickets>
 */
class TicketsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user = User::factory()->create();
        $match = MatchTable::factory()->create();
        return [
            'user_id' => $user->id,
            'match_id' => $match->id,
            'ticket_number' => Str::uuid(),
            'reservation_date' => fake()->unixTime(),
            'seat' => 'norm',
        ];
    }
}
