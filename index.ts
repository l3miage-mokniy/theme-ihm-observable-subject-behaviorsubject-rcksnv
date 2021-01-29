import { BehaviorSubject, fromEvent, Observable, of, Subject, Subscription } from 'rxjs'; 
import { map } from 'rxjs/operators';

/*--------------------------------------------------------------------------------------
 * Exemple 1 : Observable et abonnement multiples
 */
// On crée un observable qui va publier des entiers
const obs1 = new Observable<number>( observateur =>  {
  let i = 0;
  observateur.next(i++);
  setInterval( () => observateur.next(i++), 500); // Incrémente toute les 500ms
  setTimeout( () => observateur.complete(), 5100);// Termine au bout de 5,1s
});
// Code pour s'abonner via les boutons et mettre à jour les textes
const ex1 = document.querySelector("#ex1");
ex1.querySelectorAll("tr").forEach( tr => {
  const bt = tr.querySelector("button") as HTMLButtonElement;
  const td = tr.querySelector("td:nth-child(2)") as HTMLButtonElement;
  let S: Subscription;
  fromEvent(bt, "click").subscribe( () => {
    S?.unsubscribe();
    S = obs1.subscribe(
      v => td.textContent = `obs1 publie ${v}`,
      undefined,
      () => td.textContent = `obs1 a terminé`,
    )
  });
});

/*--------------------------------------------------------------------------------------
 * Exemple 2 : Subject et abonnement multiples
 */
const subj2 = new Subject<number>();
let nb2 = 0;
let aboInt2 = setInterval( () => {
                if (nb2 < 30) {
                  subj2.next(++nb2);
                } else {
                  subj2.complete();
                  clearInterval(aboInt2);
                }
              },
              2000);

const ex2 = document.querySelector("#ex2");
const label2 = ex2.querySelector("label");
subj2.subscribe( v => label2.textContent = `${nb2}` );

ex2.querySelectorAll("tr").forEach( tr => {
  const bt = tr.querySelector("button") as HTMLButtonElement;
  const td = tr.querySelector("td:nth-child(2)") as HTMLButtonElement;
  let S: Subscription;
  fromEvent(bt, "click").subscribe( () => {
    S?.unsubscribe();
    S = subj2.subscribe(
      v => td.textContent = `subj2 publie ${v}`,
      undefined,
      () => td.textContent = `subj2 a terminé`,
    )
  });
});

/*--------------------------------------------------------------------------------------
 * Exemple 3 : Subject et abonnement multiples
 */
const bs3 = new BehaviorSubject<number>(30);
let aboInt3 =  setInterval( () => {
                if (bs3.value > 0) {
                  bs3.next(bs3.value - 1);
                } else {
                  bs3.complete();
                  clearInterval(aboInt3);
                }
              },
              2000);

const ex3 = document.querySelector("#ex3");
const label3 = ex3.querySelector("label");
bs3.subscribe( v => label3.textContent = `${v}` );

ex3.querySelectorAll("tr").forEach( tr => {
  const bt = tr.querySelector("button") as HTMLButtonElement;
  const td = tr.querySelector("td:nth-child(2)") as HTMLButtonElement;
  let S: Subscription;
  fromEvent(bt, "click").subscribe( () => {
    S?.unsubscribe();
    S = bs3.subscribe(
      v => td.textContent = `bs3 publie ${v}`,
      undefined,
      () => td.textContent = `bs3 a terminé`,
    )
  });
});

