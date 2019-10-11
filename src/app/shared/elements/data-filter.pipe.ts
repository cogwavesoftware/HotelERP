import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilter"
})

export class DataFilterPipe implements PipeTransform {

    // transform(array: any[], query: string): any {
    //     if (query) {
    //         return _.filter(array, row=>row.BranchName.toLowerCase().indexOf(query) > -1);
    //     }
    //     return array;
    // }
    transform(value: any, args?: any): any {
        if(!value)return null;
        if(!args)return value;
        args = args.toLowerCase();
        return value.filter(function(item){
            return JSON.stringify(item).toLowerCase().includes(args);
        });
    }
}