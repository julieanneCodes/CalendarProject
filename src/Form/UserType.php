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
                'data' => $email
            ])
            ->add('name', TextType::class)
            ->add('password', RepeatedType::class, array(
                'type' => PasswordType::class,
                'first_options' => array('label' => 'Password'),
                'second_options' => array('label' => 'Repeat Password'),
            ))
            ->add('viewConfig', EntityType::class, [
                'class' => ViewConfig::class,
                'choice_label' => 'panel_name',
            ])
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
