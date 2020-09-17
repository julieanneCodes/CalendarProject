<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200917135935 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE day_task');
        $this->addSql('DROP INDEX IDX_6EA9A146A3A4597A');
        $this->addSql('DROP INDEX UNIQ_6EA9A14679F37AE5');
        $this->addSql('CREATE TEMPORARY TABLE __temp__calendar AS SELECT id, id_user_id, calendar_day_id, time, day FROM calendar');
        $this->addSql('DROP TABLE calendar');
        $this->addSql('CREATE TABLE calendar (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, id_user_id INTEGER NOT NULL, calendar_day_id INTEGER NOT NULL, time TIME NOT NULL, day DATE NOT NULL, CONSTRAINT FK_6EA9A14679F37AE5 FOREIGN KEY (id_user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_6EA9A146A3A4597A FOREIGN KEY (calendar_day_id) REFERENCES day (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO calendar (id, id_user_id, calendar_day_id, time, day) SELECT id, id_user_id, calendar_day_id, time, day FROM __temp__calendar');
        $this->addSql('DROP TABLE __temp__calendar');
        $this->addSql('CREATE INDEX IDX_6EA9A146A3A4597A ON calendar (calendar_day_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6EA9A14679F37AE5 ON calendar (id_user_id)');
        $this->addSql('DROP INDEX UNIQ_527EDB2579F37AE5');
        $this->addSql('CREATE TEMPORARY TABLE __temp__task AS SELECT id, id_user_id, day FROM task');
        $this->addSql('DROP TABLE task');
        $this->addSql('CREATE TABLE task (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, id_user_id INTEGER DEFAULT NULL, day DATE DEFAULT NULL, CONSTRAINT FK_527EDB2579F37AE5 FOREIGN KEY (id_user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO task (id, id_user_id, day) SELECT id, id_user_id, day FROM __temp__task');
        $this->addSql('DROP TABLE __temp__task');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_527EDB2579F37AE5 ON task (id_user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE day_task (day_id INTEGER NOT NULL, task_id INTEGER NOT NULL, PRIMARY KEY(day_id, task_id))');
        $this->addSql('CREATE INDEX IDX_F91636538DB60186 ON day_task (task_id)');
        $this->addSql('CREATE INDEX IDX_F91636539C24126 ON day_task (day_id)');
        $this->addSql('DROP INDEX UNIQ_6EA9A14679F37AE5');
        $this->addSql('DROP INDEX IDX_6EA9A146A3A4597A');
        $this->addSql('CREATE TEMPORARY TABLE __temp__calendar AS SELECT id, id_user_id, calendar_day_id, time, day FROM calendar');
        $this->addSql('DROP TABLE calendar');
        $this->addSql('CREATE TABLE calendar (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, id_user_id INTEGER NOT NULL, calendar_day_id INTEGER NOT NULL, time TIME NOT NULL, day DATE NOT NULL)');
        $this->addSql('INSERT INTO calendar (id, id_user_id, calendar_day_id, time, day) SELECT id, id_user_id, calendar_day_id, time, day FROM __temp__calendar');
        $this->addSql('DROP TABLE __temp__calendar');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6EA9A14679F37AE5 ON calendar (id_user_id)');
        $this->addSql('CREATE INDEX IDX_6EA9A146A3A4597A ON calendar (calendar_day_id)');
        $this->addSql('DROP INDEX UNIQ_527EDB2579F37AE5');
        $this->addSql('CREATE TEMPORARY TABLE __temp__task AS SELECT id, id_user_id, day FROM task');
        $this->addSql('DROP TABLE task');
        $this->addSql('CREATE TABLE task (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, id_user_id INTEGER DEFAULT NULL, day DATE DEFAULT NULL)');
        $this->addSql('INSERT INTO task (id, id_user_id, day) SELECT id, id_user_id, day FROM __temp__task');
        $this->addSql('DROP TABLE __temp__task');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_527EDB2579F37AE5 ON task (id_user_id)');
    }
}
