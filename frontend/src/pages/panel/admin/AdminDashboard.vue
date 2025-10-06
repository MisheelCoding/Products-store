<template>
  <div>
    <h2>admin dashboard</h2>
    <main class="_container">
      <article>
        <h2>Lorem ipsum dolor sit amet.</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, sint quis placeat
          asperiores corporis at. Laborum, cum nulla pariatur sint ratione exercitationem
          perferendis dolores necessitatibus voluptates, praesentium id quis officiis. Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Sunt, sint quis placeat asperiores corporis
          at. Laborum, cum nulla pariatur sint ratione exercitationem perferendis dolores
          necessitatibus voluptates, praesentium id quis officiis.
        </p>
      </article>
      <article>
        <h2>Lorem ipsum dolor sit amet.</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, sint quis placeat
          asperiores corporis at. Laborum, cum nulla pariatur sint ratione exercitationem
          perferendis dolores necessitatibus voluptates, praesentium id quis officiis.
        </p>
      </article>
      <article>
        <h2>Lorem ipsum dolor sit amet.</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, sint quis placeat
          asperiores corporis at. Laborum, cum nulla pariatur sint ratione exercitationem
          perferendis dolores necessitatibus voluptates, praesentium id quis officiis. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Fugiat, eligendi.
        </p>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
._container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  width: 100%;
  overflow-y: scroll !important;
  /* container-type: inline-size;
  container-name: admin-view; */
  container: admin-view / inline-size;
}

article {
  background-color: var(--accent);
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  max-width: 18rem;
}

@container admin-view (max-width: 1920px) {
  article {
    min-width: calc((100% - 2 * 0.875rem) / 3);
  }
}
@container admin-view (max-width: 670px) {
  article {
    flex-direction: row;
    min-width: 100%;
  }
}
</style>
