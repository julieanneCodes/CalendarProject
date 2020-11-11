<?php

namespace App\Controller;

use App\Entity\ViewConfig;
use App\Form\ViewConfigType;
use App\Repository\ViewConfigRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/view/config")
 */
class ViewConfigController extends AbstractController
{
    /**
     * @Route("/", name="view_config_index", methods={"GET"})
     */
    public function index(ViewConfigRepository $viewConfigRepository): Response
    {
        return $this->render('view_config/index.html.twig', [
            'view_configs' => $viewConfigRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="view_config_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $viewConfig = new ViewConfig();
        $form = $this->createForm(ViewConfigType::class, $viewConfig);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($viewConfig);
            $entityManager->flush();

            return $this->redirectToRoute('view_config_index');
        }

        return $this->render('view_config/new.html.twig', [
            'view_config' => $viewConfig,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="view_config_show", methods={"GET"})
     */
    public function show(ViewConfig $viewConfig): Response
    {
        return $this->render('view_config/show.html.twig', [
            'view_config' => $viewConfig,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="view_config_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, ViewConfig $viewConfig): Response
    {
        $form = $this->createForm(ViewConfigType::class, $viewConfig);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('view_config_index');
        }

        return $this->render('view_config/edit.html.twig', [
            'view_config' => $viewConfig,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="view_config_delete", methods={"DELETE"})
     */
    public function delete(Request $request, ViewConfig $viewConfig): Response
    {
        if ($this->isCsrfTokenValid('delete'.$viewConfig->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($viewConfig);
            $entityManager->flush();
        }

        return $this->redirectToRoute('view_config_index');
    }
}
