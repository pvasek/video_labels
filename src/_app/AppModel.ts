import { observable, action, computed } from "mobx";
import { HttpClient } from "aurelia-fetch-client";
import { comparer } from "mobx/lib/types/comparer";
import { CanvasModel } from "./Canvas";

export interface Labels {
    [key: string]: { 
        x: number;
        y: number;
    };
}

export interface ImageGroup {
    id: string;
    name: string;
    files?: string[];
    labels: Labels;
}

export class AppModel {
    constructor(private httpClient: HttpClient) {
        this.canvasModel = new CanvasModel(this);
    }

    canvasModel: CanvasModel;
    
    @action async load() {
        const response = await this.httpClient.fetch("/api/v1/imagegroup");
        const groups = await response.json();
        this.groups.splice(0, this.groups.length);
        this.groups.push(...groups);
        if (groups && groups.length > 0) {
            await this.selectGroup(groups[0].id);
        }
    } 

    @action async selectGroup(id: string): Promise<void> {
        const url = `/api/v1/imagegroup/${encodeURIComponent(id)}`;
        const response = await this.httpClient.fetch(url);
        const group: ImageGroup = await response.json();
        this.selectedGroup = group;
        this.selectImage(group.files[0]);
    }
    
    @action.bound async selectImage(id: string) {
        this.selectedImageId = id;
        this.canvasModel.draw();
    }

    @action.bound selectNext() {
        if (this.selectedImageId == null) {
            this.selectedImageId = this.selectedGroup.files[0];
        }
        let idx = this.selectedGroup.files.indexOf(this.selectedImageId) + 1;
        if (idx >= this.selectedGroup.files.length) {
            idx = 0;
        }
        this.selectImage(this.selectedGroup.files[idx]);
    }

    @action.bound selectPrevious() {
        if (this.selectedImageId == null) {
            this.selectedImageId = this.selectedGroup.files[this.selectedGroup.files.length - 1];
        }

        let idx = this.selectedGroup.files.indexOf(this.selectedImageId) - 1;
        if (idx < 0) {
            idx = this.selectedGroup.files.length - 1;
        }
        this.selectImage(this.selectedGroup.files[idx]);
    }

    @action setWidth(width: number) {
        this.width = width;
        this.canvasModel.draw();
    }

    @observable selectedImageId: string = null;
    @observable selectedGroup: ImageGroup = null;
    @observable groups: ImageGroup[] = [];
    @observable width: number = 600;

    @computed get currentIndex() {
        if (this.selectedGroup) {
            return this.selectedGroup.files.indexOf(this.selectedImageId);
        }        
        return 0;
    }

    @computed get length() {
        if (this.selectedGroup) {
            return this.selectedGroup.files.length;
        }
        return 0;
    }    

    @computed get imageUrl() {
        if (this.selectedGroup) {
            return `/data/${this.selectedGroup.id}/${this.selectedImageId}`;
        }
        return '';
    }
}