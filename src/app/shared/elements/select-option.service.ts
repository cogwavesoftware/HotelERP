import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IOption} from 'ng-select';

@Injectable()
export class SelectOptionService {
  public static readonly PLAYER_ONE: Array<IOption> = [
    {value: '0', label: 'Alabama'},
    {value: '1', label: 'Wyoming'},
    {value: '2', label: 'Coming'},
    {value: '3', label: 'Henry Die'},
    {value: '4', label: 'John Doe'}
  ];

  private static readonly COUNTRIES: Array<IOption> = [
    {value: 'AF', label: 'Afghanistan'},
  
    {value: 'BF', label: 'Burkina Faso'},
    {value: 'BI', label: 'Burundi'},
    
    {value: 'ZW', label: 'Zimbabwe'}
  ];

    getCharacters(): Array<IOption> {
        return this.cloneOptions(SelectOptionService.PLAYER_ONE);
    }

    loadCharacters(): Observable<Array<IOption>> {
        alert('s')
        return this.loadOptions(SelectOptionService.PLAYER_ONE);
    }

    getCharactersWithDisabled(): Array<IOption> {
        const characters: Array<IOption> = this.cloneOptions(SelectOptionService.PLAYER_ONE);
        characters[1].disabled = true;
        characters[4].disabled = true;
        return characters;
    }

    getCountries(): Array<IOption> {
        return this.cloneOptions(SelectOptionService.COUNTRIES);
    }

    loadCountries(): Observable<Array<IOption>> {
        return this.loadOptions(SelectOptionService.COUNTRIES);
    }

    private loadOptions(options: Array<IOption>): Observable<Array<IOption>> {
        return new Observable((obs) => {
            setTimeout(() => {
                obs.next(this.cloneOptions(options));
                obs.complete();
            }, 5000);
        });
    }

    private cloneOptions(options: Array<IOption>): Array<IOption> {
        return options.map(option => ({ value: option.value, label: option.label }));
    }
}
