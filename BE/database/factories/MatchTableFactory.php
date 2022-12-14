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
        $match = Stadium::factory()->create();
        $shapes = array('oval', 'rect', 'square');
        return [
            'team_1' => rand(1,32),
            'team_2' => rand(1,32),
            'match_date' => fake()->unixTime(),
            'main_ref' => fake()->name(),
            'lineman_1' => fake()->name(),
            'lineman_2' => fake()->name(),
            'stadium_id'=> $match->id
        ];
    }
}
