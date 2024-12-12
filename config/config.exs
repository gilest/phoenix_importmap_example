# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :phoenix_importmap_example,
  generators: [timestamp_type: :utc_datetime]

# Configures the endpoint
config :phoenix_importmap_example, PhoenixImportmapExampleWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [
      html: PhoenixImportmapExampleWeb.ErrorHTML,
      json: PhoenixImportmapExampleWeb.ErrorJSON
    ],
    layout: false
  ],
  pubsub_server: PhoenixImportmapExample.PubSub,
  live_view: [signing_salt: "xtBcLDLp"]

config :phoenix_importmap, :importmap, %{
  app: "/assets/js/app.js",
  topbar: "/assets/vendor/topbar.js",
  phoenix_html: "/deps/phoenix_html/priv/static/phoenix_html.js",
  phoenix: "/deps/phoenix/priv/static/phoenix.mjs",
  phoenix_live_view: "/deps/phoenix_live_view/priv/static/phoenix_live_view.esm.js"
}

# Configure tailwind (the version is required)
config :tailwind,
  version: "3.4.3",
  phoenix_importmap_example: [
    args: ~w(
      --config=tailwind.config.js
      --input=css/app.css
      --output=../priv/static/assets/app.css
    ),
    cd: Path.expand("../assets", __DIR__)
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
