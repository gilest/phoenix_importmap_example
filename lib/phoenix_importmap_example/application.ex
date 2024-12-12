defmodule PhoenixImportmapExample.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      PhoenixImportmapExampleWeb.Telemetry,
      {DNSCluster, query: Application.get_env(:phoenix_importmap_example, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: PhoenixImportmapExample.PubSub},
      # Start a worker by calling: PhoenixImportmapExample.Worker.start_link(arg)
      # {PhoenixImportmapExample.Worker, arg},
      # Start to serve requests, typically the last entry
      PhoenixImportmapExampleWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PhoenixImportmapExample.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    PhoenixImportmapExampleWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
