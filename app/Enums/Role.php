<?php

namespace App\Enums;

enum Role: string
{
    case Admin = 'admin';
    case Employee = 'employee';
    case Client = 'client';
}
