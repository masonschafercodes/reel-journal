import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Top 20 TV Shows
const seedShows = [
  'The Office',
  'Parks and Recreation',
  'The Mandalorian',
  'Breaking Bad',
  'Game of Thrones',
  'The Witcher',
  'Stranger Things',
  'The Crown',
  "The Queen's Gambit",
  'The Umbrella Academy',
  'Euphoria',
  'Rick and Morty',
  'The Simpsons',
  'Peaky Blinders',
  'The Big Bang Theory',
  'Friends',
  "Grey's Anatomy",
  'The Walking Dead',
  'The Boys',
  'The Flash',
  'Arrow',
];

const tvShowSearchAPI =
  'https://api.themoviedb.org/3/search/tv?query={query}&include_adult=false&language=en-US&page=1';

const tvShowDetailsAPI =
  'https://api.themoviedb.org/3/tv/{show_id}/season/1?language=en-US';

function replaceWith(pattern: string = '{query}', value: string, url: string) {
  return url.replace(pattern, value);
}

function typedFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  return fetch(input, init).then((res) => res.json());
}

async function main() {
  seedShows.forEach(async (show) => {
    const showEncoded = encodeURIComponent(show);
    const tvShowSearch = replaceWith('{query}', showEncoded, tvShowSearchAPI);

    const response = await typedFetch<ITVSearchResponse>(tvShowSearch, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    });

    const firstShow = response.results[0];

    if (!firstShow) {
      console.log(`No show found for ${show}`);
      return;
    }

    console.log(`First show found for ${show}: ${firstShow.name}`);

    const addedShow = await prisma.show.create({
      data: {
        apiId: `${firstShow.id}`,
        description: firstShow.overview,
        title: firstShow.name,
      },
    });

    console.log(`Added show: ${addedShow.title}`);

    const tvShowDetails = replaceWith(
      '{show_id}',
      `${firstShow.id}`,
      tvShowDetailsAPI,
    );

    const detailsResponse = await typedFetch<ITVShowDetailsResponse>(
      tvShowDetails,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      },
    );

    if (!detailsResponse.episodes) {
      console.log(`No episodes found for ${show} | Season 1`);
      return;
    }

    console.log(`Episodes found for ${show} | Season 1`);

    // create new season for show
    const addedSeason = await prisma.season.create({
      data: {
        airDate: new Date(detailsResponse.air_date),
        apiId: `${detailsResponse.id}`,
        name: detailsResponse.name,
        overview: detailsResponse.overview,
        poster: detailsResponse.poster_path,
        seasonNumber: detailsResponse.season_number,
        show: {
          connect: {
            id: addedShow.id,
          },
        },
      },
    });

    for (const episode of detailsResponse.episodes) {
      const addedEpisode = await prisma.episode.create({
        data: {
          airDate: new Date(episode.air_date),
          apiId: `${episode.id}`,
          episodeNumber: episode.episode_number,
          name: episode.name,
          overview: episode.overview,
          still: episode.still_path,
          season: {
            connect: {
              id: addedSeason.id,
            },
          },
        },
      });

      console.log(`Added episode: ${addedEpisode.name}`);

      for (const crew of episode.crew) {
        const addedCrew = await prisma.crew.create({
          data: {
            department: crew.department,
            job: crew.job,
            name: crew.name,
            apiId: `${crew.id}`,
            creditId: crew.credit_id,
            profilePath: crew.profile_path,
            episode: {
              connect: {
                id: addedEpisode.id,
              },
            },
          },
        });

        console.log(`Added crew: ${addedCrew.name}`);
      }
    }

    console.log(`Added season: ${addedSeason.name}`);
    console.log(`Finished seeding ${show}`);
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
