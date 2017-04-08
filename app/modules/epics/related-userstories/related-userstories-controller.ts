/*
 * Copyright (C) 2014-2015 Taiga Agile LLC <taiga@taiga.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * File: related-userstories.controller.coffee
 */

import * as angular from "angular"

let module = angular.module("taigaEpics");

class RelatedUserStoriesController {
    projectService:any
    epicsService:any
    sectionName:any
    showCreateRelatedUserstoriesLightbox:any
    userstories:any
    epic:any

    static initClass() {
        this.$inject = [
            "tgProjectService",
            "tgEpicsService"
        ];
    }

    constructor(projectService, epicsService) {
        this.projectService = projectService;
        this.epicsService = epicsService;
        this.sectionName = "Epics";
        this.showCreateRelatedUserstoriesLightbox = false;
    }

    showRelatedUserStoriesSection() {
        return this.projectService.hasPermission("modify_epic") || ((this.userstories != null ? this.userstories.legth : undefined) > 0);
    }

    userCanSort() {
        return this.projectService.hasPermission("modify_epic");
    }

    loadRelatedUserstories() {
        return this.epicsService.listRelatedUserStories(this.epic)
            .then(userstories => {
                return this.userstories = userstories;
        });
    }

    reorderRelatedUserstory(us, newIndex) {
        return this.epicsService.reorderRelatedUserstory(this.epic, this.userstories, us, newIndex)
            .then(userstories => {
                return this.userstories = userstories;
        });
    }
}
RelatedUserStoriesController.initClass();

module.controller("RelatedUserStoriesCtrl", RelatedUserStoriesController);
