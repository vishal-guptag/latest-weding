import { weddingDetails } from '../data/weddingDetails';
import { Divider } from './Ornaments';

export default function FamilyInvite() {
  const { invite } = weddingDetails;
  return (
    <section aria-labelledby="invite-title" className="chapter-paper px-5 py-24 text-center">
      <div className="gold-frame mx-auto max-w-2xl rounded-sm px-6 py-14 sm:px-12">
        <p lang="hi" className="text-xl text-wine">|| श्री गणेशाय नमः ||</p>
        <Divider className="mx-auto my-5 w-48" />
        <h2 id="invite-title" className="font-display text-3xl font-semibold text-wine sm:text-4xl">{invite.hosts}</h2>
        <p className="mx-auto mt-5 max-w-lg leading-relaxed">
          {invite.request} <strong className="font-display text-xl text-wine">{invite.ceremony}</strong> {invite.ofSon}
        </p>
        <p className="mt-8 font-display text-5xl font-semibold text-wine">Vishal</p>
        <p className="mx-auto mt-1 max-w-sm text-sm">({invite.groomLine})</p>
        <p className="my-5 font-script text-3xl text-gold-dark">with</p>
        <p className="font-display text-5xl font-semibold text-wine">Shruti</p>
        <p className="mx-auto mt-1 max-w-sm text-sm">({invite.brideLine})</p>
      </div>
    </section>
  );
}
