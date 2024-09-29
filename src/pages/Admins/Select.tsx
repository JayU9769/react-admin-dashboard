import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React, {useEffect} from "react";
import {useGetDropdownOptionsQuery, rootApi} from "@/store/root/api.ts";
import {EAPITags} from "@/interfaces";
import { useDispatch } from "react-redux";
import {AppDispatch} from "@/store";

const data = [
  { label: "English", value: "efghfghn" },
  { label: "French", value: "ffghr" },
  { label: "German", value: "dcvbe" },
  { label: "Spanish", value: "ecvbs" },
  { label: "Portuguese", value: "pcvbcvbt" },
  { label: "Russian", value: "rcvbu" },
  { label: "Japanese", value: "jvbca" },
  { label: "Korean", value: "kfgho" },
  { label: "Chinese", value: "fghzh" },
  { label: "English", value: "afghfghsd" },
  { label: "French", value: "fsdfsr" },
  { label: "German", value: "dfgfghfgh" },
  { label: "Spanish", value: "ret" },
  { label: "Portuguese", value: "ffghfghgh" },
  { label: "Russian", value: "nbm" },
  { label: "Japanese", value: "xcvxc" },
  { label: "Korean", value: "ytj" },
  { label: "Chinese", value: "qwe" },
  { label: "English", value: "dfg" },
  { label: "French", value: "nvm" },
  { label: "German", value: "tyu" },
  { label: "Spanish", value: "asf" },
  { label: "Portuguese", value: "hgfjh" },
  { label: "Russian", value: "errfb" },
  { label: "Japanese", value: "cvbg" },
  { label: "Korean", value: "sdfg" },
  { label: "Chinese", value: "zusdfsdfh" },
  { label: "English", value: "eun" },
  { label: "French", value: "fur" },
  { label: "German", value: "dye" },
  { label: "Spanish", value: "ets" },
  { label: "Portuguese", value: "prt" },
  { label: "Russian", value: "rru" },
  { label: "Japanese", value: "jae" },
  { label: "Korean", value: "kow" },
  { label: "Chinese", value: "zhq" },
] as const;

interface IProps {
  type: string;
  value: string | null;
  onChange: (val: string) => void;
}
const Index: React.FC<IProps> = (
  {
    value,
    type,
    onChange
  }
) => {

  ///////////////////////// Redux States and Actions... /////////////////////////
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useGetDropdownOptionsQuery(type)

  useEffect(() => {
    return () => {
      console.log("On Unmount");
      // dispatch(rootApi.util.invalidateTags([{ type: EAPITags.DROPDOWN_OPTIONS, id: type }]))
    }
  }, []);
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className={cn("w-full justify-between", !selectedValue && "text-muted-foreground")}>
          {selectedLabel ? selectedLabel : "Select item"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="popover-content-width-full p-0">
        <Command>
          <CommandInput placeholder="Search item..." />
          <CommandList>
            <CommandEmpty>No Results.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  value={item.label}
                  key={item.value}
                  onSelect={() => {
                    onChange(item.value);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", item.value === selectedValue ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Index;