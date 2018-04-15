import * as React from "react";
import { observer } from "mobx-react";
import { AppModel } from "./AppModel";
import { MouseEvent } from "react";
import { AppToolbar } from "./AppToolbar";
import { Canvas } from "./Canvas";
import { ProjectList } from "./Pages/Project/ProjectList";
import { AppRouter } from "./Components/Router";
import { Link } from "./Components/Link";

export class AppProps {
    model: AppModel;
    router: AppRouter;
}

@observer
export class App extends React.Component<AppProps> {
    selectImage(e: MouseEvent<any>, id: string) {
        e.preventDefault();
        e.stopPropagation();
        this.props.model.selectImage(id);
    }

    render() {
        const { model, router } = this.props;        
        return <div>  
            <Link to={router.projects.navigator({})}>Projects</Link> 
            <Link to={router.projectDetail.navigator({id: "1"})}>Projects</Link>
            {router.projects.isCurrent && <ProjectList/>}
            {router.projectDetail.isCurrent && <div>project detail</div>}
        </div>;
    }
    // render() {
    //     const { model } = this.props;        
    //     return <div className="label-maker">            
    //         <AppToolbar model={model} />
    //         {model.selectedImageId && <div className="image">                    
    //             <Canvas model={model.canvasModel} />
    //         </div>}            
    //     </div>;
    // }
}
