<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stadium>
 */
class StadiumFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $shapes = array('oval', 'rect', 'square');
        return [
            'name' => fake()->unique()->name(),
            'shape' => $shapes[ array_rand($shapes) ],
            'total_number_of_seats' => rand(10000, 90000),
            'number_of_rows_in_vip' => rand(50, 150),
            'number_seats_per_row' => rand(100, 1000)
        ];
    }
}
