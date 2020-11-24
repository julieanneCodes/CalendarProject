<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DoubleController extends AbstractController
{
    /**
     * @Route("/double", name="double")
     */
    public function index(): Response
    {
        return $this->render('double/index.html.twig', [
            'controller_name' => 'DoubleController',
        ]);
    }
}
