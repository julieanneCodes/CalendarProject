<?php

namespace App\Controller;

use App\Entity\Calendar;
use App\Form\CalendarType;
use App\Repository\CalendarRepository;
use App\Repository\ViewConfigRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

/**
 * @Route("/calendar")
 */
class CalendarController extends AbstractController
{
    private $security;
    public function __construct(Security $security)
    {
        $this->security= $security;
    }

    /**
     * @Route("/new", name="calendar_new", methods={"GET","POST"})
     */
    public function new(Request $request, ViewConfigRepository $configRepo): Response
    {
        $defaultView = $configRepo->findOneBy(['id' => 1]);
        $singleView = $configRepo->findOneBy(['id' => 2]);
        $user = $this->security->getUser();
        $calendar = new Calendar();
        $form = $this->createForm(CalendarType::class, $calendar);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($calendar);
            $entityManager->flush();
            if($user->getViewConfig() === $defaultView) {
                return $this->redirectToRoute('double');
            } else if($user->getViewConfig() === $singleView) {
                return $this->redirectToRoute('single_calendar');
            }
        }

        return $this->render('calendar/new.html.twig', [
            'calendar' => $calendar,
            'form' => $form->createView(),
            'user' => $user,
            'buttonDisplay' => 'none',
            'backRoute' => $user->getViewConfig() === $defaultView ? "http://127.0.0.1:8000/double" : "http://127.0.0.1:8000/single",
        ]);
    }

    /**
     * @Route("/event/edit", name="event-edit", methods={"GET", "POST", "PUT"})
     */
    public function editTest(Request $request, CalendarRepository $calendarRepository)
    {
        $data = json_decode($request->getContent(), true);
        $cId = $data["id"];
        $eventName = $data["name"];
        $fDay = $data["fDay"];
        $dayTwo = $data["sDay"];
        $timeOne = $data["fTime"];
        $timeTwo = $data["sTime"];
        $notes = $data["notes"];

        $calendarRepository->edit($cId, $eventName, $fDay, $dayTwo, $timeOne, $timeTwo, $notes);

        return new Response();
    }

    /**
     *@Route("/event/delete/{id}", name="event-delete", methods={"DELETE"})
     */
    public function deleteEvent(int $id, CalendarRepository $calendarRepository)
    {
        $calendarRepository->deleteEvent($id);

        return new Response();
    }
}
