import React, {useState} from "react";
import DebouncingInput from "@/components/DebouncingInput.tsx";
import {EUserType} from "@/interfaces";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";

const Index: React.FC = () => {

  const [search, setSearch] = useState<string>('')
  const [listType, setListType] = useState<EUserType>(EUserType.ADMIN)
  console.log(listType);
  return <>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className={"flex flex-1 items-center space-x-2"}>
          <DebouncingInput
            placeholder="Search..."
            value={search}
            onChange={(value) => setSearch(value)}
            className="h-8 w-[150px] lg:w-[250px] bg-white"
          />
        </div>
        <div>
          <Tabs defaultValue={EUserType.ADMIN} onValueChange={(value) => setListType(value as EUserType)}>
            <TabsList>
              <TabsTrigger value={EUserType.ADMIN} className={`capitalize`}>{ EUserType.ADMIN }</TabsTrigger>
              <TabsTrigger value={EUserType.USER} className={`capitalize`}>{ EUserType.USER }</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  </>
}

export default Index;