<?php

namespace App\Enums;


enum Status: string
{
    case Pending = 'pending';
    case Progress = 'in_progress';
    case Completed = 'completed';
}
