<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Repository\CalendarRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class SingleController extends AbstractController
{
    private $security;
    public function __construct(Security $security)
    {
        $this->security= $security;
    }
    /**
     * @Route("/single/calendar", name="single-calendar")
     */
    public function index(CalendarRepository $calendarRepository, SerializerInterface $serializer): Response
    {
        $user = $this->security->getUser();
        $id = $user->getId();
        $jsonData = $serializer->serialize($calendarRepository->findAllById($id), 'json', ['groups' => 'calendar_data']);
        //return $this->redirectToRoute('calendar_index');
        return $this->render('single/index.html.twig', [
            'data' => $jsonData,
            'user' => $user,
        ]);
    }

}
