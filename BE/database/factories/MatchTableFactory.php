<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Stadium;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MatchTable>
 */
class MatchTableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $stadium = Stadium::factory()->create();
        return [
            'team_1' => rand(1,32),
            'team_2' => rand(1,32),
            'match_date' => 1672111650 + rand(0,32000000),
            'main_ref' => fake()->name(),
            'lineman_1' => fake()->name(),
            'lineman_2' => fake()->name(),
            'stadium_id'=> $stadium->id
        ];
    }
}
