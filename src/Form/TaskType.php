<?php

namespace App\Form;

use App\Entity\Task;
use App\Entity\User;
use App\Form\DataTransformer\UserIdTransformer;
use App\Form\Type\HiddenIdType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TaskType extends AbstractType
{
    private $transformer;

    public function __construct(UserIdTransformer $transformer)
    {
        $this->transformer= $transformer;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('task_name')
            ->add('day', DateType::class, [
                'placeholder' => ['year' => 'Año', 'month' => 'mes', 'day' => 'día'],
                'widget' => 'choice',
                'years' => range(2020,2025),
            ])
            ->add('user', HiddenIdType::class)
            ->add('notes');
            $builder->get('user')->addModelTransformer($this->transformer);
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Task::class,
        ]);
    }
}
