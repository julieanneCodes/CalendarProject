<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Repository\CalendarRepository;
use App\Repository\TaskRepository;
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
     * @Route("/single", name="single_calendar")
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
            'userId' => $id,
            'route' => 'single_tasks',
            'routeName' => 'view tasks',
            'padding' => '0px 30px 0px 30px',
            'titlePadding' => '30px',
        ]);
    }
    /**
     * @Route("/single/tasks", name="single_tasks")
     */
    public function tasksIndex(TaskRepository $taskRepo, SerializerInterface $serializer): Response
    {
        $user = $this->security->getUser();
        $id = $user->getId();
        $jsonData = $serializer->serialize($taskRepo->findAllById($id), 'json', ['groups' => 'tasks_data']);

        return $this->render('single/index.html.twig', [
            'data' => $jsonData,
            'user' => $user,
            'route' => 'single_calendar',
            'routeName' => 'view events'
        ]);
    }
}
