export const EDITOR_TEXT = `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Template for a SPARC file
%% Author: Sayed Erfan Arefin
%% Description: Music, album etc.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

sorts
    #people={nickoccbrain, adriansmith, janickgers, steveharris, brucedickinson, davemurray, chrisadler,chris_martin, jonny_buckland, guy_berryman, will_champion }.
    #instrument={drums, guitar, vocals, bass}.
    #album={danceofdeath, thenumberofthebeast, powerslave}.
    #song={aceshigh, twominutestomidnight, powerslavesong, ancientmariner}.
    #band={ironmaiden, lambofgod, thebeatles, coldplay}.
    #genre={rock, metal, alternativerock}.
predicates
    bandmate(#people,#band).
    musician(#people,#instrument).
    albumof(#album,#band).
    songof(#song,#album).
    songofArtist(#song,#people).
    instrumentPlayedInSong(#song,#instrument).
    instrumentPlayedInGenre(#genre,#instrument).
    instrumentPlayerInBand(#band,#instrument,#people).
    bandgenre(#genre,#band).
   
rules

    bandmate(nickoccbrain,ironmaiden).
    bandmate(adriansmith,ironmaiden).
    bandmate(janickgers,ironmaiden).
    bandmate(steveharris,ironmaiden).
    bandmate(brucedickinson,ironmaiden).
    bandmate(davemurray,ironmaiden).
    bandmate(chris_martin,coldplay).
    bandmate(jonny_buckland,coldplay).
    bandmate(guy_berryman,coldplay).
    bandmate(will_champion ,coldplay).

    musician(nickoccbrain, drums).
    musician(adriansmith, guitar).
    musician(janickgers, guitar).
    musician(steveharris, bass).
    musician(brucedickinson, vocals).
    musician(davemurray, guitar).
    
    bandgenre(metal,ironmaiden).
    
    albumof(danceofdeath, ironmaiden).
    albumof(powerslave, ironmaiden).
    albumof(thenumberofthebeast, ironmaiden).
    
    songof(aceshigh, powerslave).
    songof(twominutestomidnight, powerslave).
    songof(powerslavesong, powerslave).
    songof(ancientmariner, powerslave).

    songofArtist(X,Y) :- songof(X, A) , albumof(A, B), bandmate(Y,B).
    instrumentPlayedInSong(S,I) :- songof(S, A), albumof(A, B), bandmate(R,B),musician(R,I).
    instrumentPlayedInGenre(G,I) :- bandgenre(B,G), bandmate(R,B),musician(R,I).
    instrumentPlayerInBand(B,I,R) :- bandmate(R,B), musician(R,I).
`;
