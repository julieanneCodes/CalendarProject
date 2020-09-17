<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200917134842 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE calendar (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, id_user_id INTEGER NOT NULL, calendar_day_id INTEGER NOT NULL, time TIME NOT NULL, day DATE NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6EA9A14679F37AE5 ON calendar (id_user_id)');
        $this->addSql('CREATE INDEX IDX_6EA9A146A3A4597A ON calendar (calendar_day_id)');
        $this->addSql('CREATE TABLE day (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL)');
        $this->addSql('CREATE TABLE day_task (day_id INTEGER NOT NULL, task_id INTEGER NOT NULL, PRIMARY KEY(day_id, task_id))');
        $this->addSql('CREATE INDEX IDX_F91636539C24126 ON day_task (day_id)');
        $this->addSql('CREATE INDEX IDX_F91636538DB60186 ON day_task (task_id)');
        $this->addSql('CREATE TABLE task (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, id_user_id INTEGER DEFAULT NULL, day DATE DEFAULT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_527EDB2579F37AE5 ON task (id_user_id)');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(30) NOT NULL, mail VARCHAR(50) NOT NULL, password VARCHAR(20) NOT NULL)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE calendar');
        $this->addSql('DROP TABLE day');
        $this->addSql('DROP TABLE day_task');
        $this->addSql('DROP TABLE task');
        $this->addSql('DROP TABLE user');
    }
}
