<?php

namespace App\Controller;

use App\Form\SignUpType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(Request $request, UserRepository $userRepository)
    {   
        $users = $userRepository->findAllByEmail();
        $form = $this->createForm(SignUpType::class);
        $form->handleRequest($request);
        if($form->isSubmitted() && $form->isValid())
        {
            $email = $_POST["sign_up"]["email"];
            $finded = false;
            $_SESSION["email"] = $email;
            foreach($users as $userM) {
              if(strcasecmp($email, $userM["email"]) == 0 ) {$finded = true;}  
            }
            if($finded) {
                return $this->redirectToRoute('app_login');
            } else {
                return $this->redirectToRoute('user_register');
            }   
        }
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'form' => $form->createView()
        ]);
    }
}
