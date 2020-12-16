<?php

namespace App\Form;

use App\Entity\User;
use App\Entity\ViewConfig;
use Doctrine\DBAL\Types\StringType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $email = isset($_GET['email']) ? $_GET['email'] : '';
        $builder
            ->add('email', EmailType::class, [
                'data' => $email,
                'attr' => ['placeholder' => 'Email'],
            ])
            ->add('name', TextType::class, [
                'attr' => ['placeholder' => 'Name']
            ])
            ->add('password', RepeatedType::class, array(
                'type' => PasswordType::class,
                'first_options' => array('attr' => ['placeholder' => 'Password']),
                'second_options' => array('attr' => ['placeholder' => 'Repeat Password']),
            ))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        //session_reset();

        $resolver->setDefaults([
            'data_class' => User::class
        ]);
    }
}
