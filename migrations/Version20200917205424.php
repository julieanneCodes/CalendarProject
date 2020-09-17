<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200917205424 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE day (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL)');
        $this->addSql('DROP INDEX IDX_6EA9A146A76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__calendar AS SELECT id, user_id, time, day FROM calendar');
        $this->addSql('DROP TABLE calendar');
        $this->addSql('CREATE TABLE calendar (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, calendar_id_day_id INTEGER DEFAULT NULL, time TIME NOT NULL, day DATE NOT NULL, CONSTRAINT FK_6EA9A146A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_6EA9A1466C997F81 FOREIGN KEY (calendar_id_day_id) REFERENCES day (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO calendar (id, user_id, time, day) SELECT id, user_id, time, day FROM __temp__calendar');
        $this->addSql('DROP TABLE __temp__calendar');
        $this->addSql('CREATE INDEX IDX_6EA9A146A76ED395 ON calendar (user_id)');
        $this->addSql('CREATE INDEX IDX_6EA9A1466C997F81 ON calendar (calendar_id_day_id)');
        $this->addSql('DROP INDEX IDX_527EDB25A76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__task AS SELECT id, user_id, day FROM task');
        $this->addSql('DROP TABLE task');
        $this->addSql('CREATE TABLE task (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, day_task_id_id INTEGER DEFAULT NULL, day DATE DEFAULT NULL, CONSTRAINT FK_527EDB25A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_527EDB259E6005A8 FOREIGN KEY (day_task_id_id) REFERENCES day (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO task (id, user_id, day) SELECT id, user_id, day FROM __temp__task');
        $this->addSql('DROP TABLE __temp__task');
        $this->addSql('CREATE INDEX IDX_527EDB25A76ED395 ON task (user_id)');
        $this->addSql('CREATE INDEX IDX_527EDB259E6005A8 ON task (day_task_id_id)');
        $this->addSql('DROP INDEX UNIQ_B1D83441A76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__user_config AS SELECT id, user_id, color, panel_view FROM user_config');
        $this->addSql('DROP TABLE user_config');
        $this->addSql('CREATE TABLE user_config (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, color VARCHAR(10) NOT NULL COLLATE BINARY, panel_view INTEGER NOT NULL, CONSTRAINT FK_B1D83441A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO user_config (id, user_id, color, panel_view) SELECT id, user_id, color, panel_view FROM __temp__user_config');
        $this->addSql('DROP TABLE __temp__user_config');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B1D83441A76ED395 ON user_config (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE day');
        $this->addSql('DROP INDEX IDX_6EA9A146A76ED395');
        $this->addSql('DROP INDEX IDX_6EA9A1466C997F81');
        $this->addSql('CREATE TEMPORARY TABLE __temp__calendar AS SELECT id, user_id, time, day FROM calendar');
        $this->addSql('DROP TABLE calendar');
        $this->addSql('CREATE TABLE calendar (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, time TIME NOT NULL, day DATE NOT NULL)');
        $this->addSql('INSERT INTO calendar (id, user_id, time, day) SELECT id, user_id, time, day FROM __temp__calendar');
        $this->addSql('DROP TABLE __temp__calendar');
        $this->addSql('CREATE INDEX IDX_6EA9A146A76ED395 ON calendar (user_id)');
        $this->addSql('DROP INDEX IDX_527EDB25A76ED395');
        $this->addSql('DROP INDEX IDX_527EDB259E6005A8');
        $this->addSql('CREATE TEMPORARY TABLE __temp__task AS SELECT id, user_id, day FROM task');
        $this->addSql('DROP TABLE task');
        $this->addSql('CREATE TABLE task (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, day DATE DEFAULT NULL)');
        $this->addSql('INSERT INTO task (id, user_id, day) SELECT id, user_id, day FROM __temp__task');
        $this->addSql('DROP TABLE __temp__task');
        $this->addSql('CREATE INDEX IDX_527EDB25A76ED395 ON task (user_id)');
        $this->addSql('DROP INDEX UNIQ_B1D83441A76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__user_config AS SELECT id, user_id, color, panel_view FROM user_config');
        $this->addSql('DROP TABLE user_config');
        $this->addSql('CREATE TABLE user_config (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, color VARCHAR(10) NOT NULL, panel_view INTEGER NOT NULL)');
        $this->addSql('INSERT INTO user_config (id, user_id, color, panel_view) SELECT id, user_id, color, panel_view FROM __temp__user_config');
        $this->addSql('DROP TABLE __temp__user_config');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B1D83441A76ED395 ON user_config (user_id)');
    }
}
