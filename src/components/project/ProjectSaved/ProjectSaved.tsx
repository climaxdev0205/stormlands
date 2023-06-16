import React from 'react'
import {Container, Button} from '@components/ui'
import { useRouter } from 'next/router'
type Props = {
}
const ProjectSaved: React.FC<Props> = () => {
  const router = useRouter()
  const gotoProjectList: any = () => {
    // to be implemented...
    return router.push("/projects");
  };
  return (
    <div className="h-full w-full flex justify-center items-center ">
      <div
        className={
          " flex flex-col justify-center items-center border rounded border-neutral-100 w-4/6 h-5/6 stormShadow"
        }
      >
        <p className="p-4 text-lg">
          Zinc Lead Project has been completed and saved in your Project List
        </p>
        <p className="p-4 text-lg">
          You are ready to create reports and analyse data
        </p>
        <Button className="m-2">Analyse Project</Button>
        <Button className="m-2" dark={false} onClick={gotoProjectList}>
          See Older Projects
        </Button>
      </div>
    </div>
  );
}

export default ProjectSaved